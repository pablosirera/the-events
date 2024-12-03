import { supabase } from '@/plugins/supabase'

export default function useEvents() {
  async function listEvents() {
    const { data, error } = await supabase.from('events').select('*')
    if (error) {
      throw new Error(error.message)
    }

    console.log(data)

    return data
  }

  return {
    listEvents,
  }
}
