import axios from 'axios'

const getLogo = async (service: string): Promise<string> => {
  const res = await axios.get('https://autocomplete.clearbit.com/v1/companies/suggest?query='+service)
  return res.data?.[0]?.logo || '';
}

export default getLogo