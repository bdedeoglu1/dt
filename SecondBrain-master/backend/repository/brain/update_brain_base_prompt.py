from uuid import UUID

from models.databases.supabase.brains import BrainUpdatableProperties
from models import BrainEntity, get_supabase_db


def update_brain_base_prompt_by_id(brain_id: UUID, base_prompt: str, ui_properties: str) -> BrainEntity:
    """Update a prompt by id"""
    supabase_db = get_supabase_db()

    return supabase_db.update_brain_base_prompt_by_id(brain_id, base_prompt, ui_properties)

def get_brain_base_prompt_by_id(brain_id: UUID) -> str:
    """Get a prompt by id"""
    supabase_db = get_supabase_db()

    return supabase_db.get_brain_base_prompt_by_id(brain_id)

def get_brain_ui_properties_by_id(brain_id: UUID) -> str:
    """Get a UI properties by id"""
    supabase_db = get_supabase_db()

    return supabase_db.get_brain_ui_properties_by_id(brain_id)


