'use server'
export const addTweet = async(formData: FormData)=>{


const text = formData.get('text') as string

console.log(text)
}