import os
import tempfile
import time

import openai
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter

from models import File, get_documents_vector_store
from models import Brain
from utils.file import compute_sha1_from_content
from utils.vectors import Neurons


async def process_audio(
    file: File,
    enable_summarization: bool,
    # user,
    brain_id,
    user_openai_api_key,
):
    temp_filename = None
    file_sha = ""
    dateshort = time.strftime("%Y%m%d-%H%M%S")
    file_meta_name = f"audiotranscript_{dateshort}.txt"
    documents_vector_store = get_documents_vector_store()

    # use this for whisper
    os.environ.get("OPENAI_API_KEY")
    # if user_openai_api_key:
    #     pass

    try:
        upload_file = file.file
        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=upload_file.filename,  # pyright: ignore reportPrivateUsage=none
        ) as tmp_file:
            await upload_file.seek(0)  # pyright: ignore reportPrivateUsage=none
            content = (
                await upload_file.read()  # pyright: ignore reportPrivateUsage=none
            )
            tmp_file.write(content)
            tmp_file.flush()
            tmp_file.close()

            temp_filename = tmp_file.name

            with open(tmp_file.name, "rb") as audio_file:
                transcript = openai.Audio.transcribe("whisper-1", audio_file)

        file_sha = compute_sha1_from_content(
            transcript.text.encode("utf-8")  # pyright: ignore reportPrivateUsage=none
        )
        file_size = len(
            transcript.text.encode("utf-8")  # pyright: ignore reportPrivateUsage=none
        )

        chunk_size = 500
        chunk_overlap = 0

        text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
            chunk_size=chunk_size, chunk_overlap=chunk_overlap
        )
        texts = text_splitter.split_text(
            transcript.text.encode("utf-8")  # pyright: ignore reportPrivateUsage=none
        )

        docs_with_metadata = [
            Document(
                page_content=text,
                metadata={
                    "file_sha1": file_sha,
                    "file_size": file_size,
                    "file_name": file_meta_name,
                    "chunk_size": chunk_size,
                    "chunk_overlap": chunk_overlap,
                    "date": dateshort,
                },
            )
            for text in texts
        ]

        documents_vector_store.add_documents(docs_with_metadata)

        ## mode 1
        brain = Brain(id=brain_id)
        file.link_file_to_brain(brain)

        ## mode 2
        neurons = Neurons()
        created_vector = neurons.create_vector(docs_with_metadata, user_openai_api_key)
        # add_usage(stats_db, "embedding", "audio", metadata={"file_name": file_meta_name,"file_type": ".txt", "chunk_size": chunk_size, "chunk_overlap": chunk_overlap})

        created_vector_id = created_vector[0]  # pyright: ignore reportPrivateUsage=none

        brain = Brain(id=brain_id)
        brain.create_brain_vector(created_vector_id, file.file_sha1)

    finally:
        if temp_filename and os.path.exists(temp_filename):
            os.remove(temp_filename)