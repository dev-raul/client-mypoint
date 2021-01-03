import api from '../services/api'

export async function getFile(file: string): Promise<string>{
  const imageBlob = await api.get(`file/${file}`, {responseType: 'blob'})
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(imageBlob.data);
  });

}


