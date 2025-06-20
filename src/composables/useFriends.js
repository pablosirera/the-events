import { supabase } from '@/plugins/supabase'
import useUser from './useUser'
import Friend from '@/models/Friend'

export default function useFriends() {
  const { user } = useUser()

  async function listFriends() {
    const { data, error } = await supabase.from('friends').select('*')

    if (error) {
      throw new Error(error.message)
    }
    return data ? data.map(d => new Friend(d)) : []
  }

  async function createFriend({ name, phone, birthdate, last_visited, photoFile }) {
    let avatar = ''
    if (photoFile) {
      const fileExt = photoFile.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${user.value.id}/${fileName}`
      const { error: uploadError } = await supabase.storage
        .from('friends-photos')
        .upload(filePath, photoFile)
      if (uploadError) {
        throw new Error('Error subiendo la foto: ' + uploadError.message)
      }
      const { data: publicUrlData } = supabase.storage.from('friends-photos').getPublicUrl(filePath)
      avatar = publicUrlData.publicUrl
    }

    const birthdateISO = birthdate ? new Date(birthdate).toISOString() : null
    const lastVisitedISO = last_visited ? new Date(last_visited).toISOString() : null

    const { error } = await supabase.from('friends').insert([
      {
        name,
        phone: phone ? Number(phone) : null,
        birthdate: birthdateISO,
        last_visited: lastVisitedISO,
        avatar,
      },
    ])

    if (error) {
      throw new Error('Error creando amigo: ' + error.message)
    }
    return true
  }

  return {
    listFriends,
    createFriend,
  }
}
