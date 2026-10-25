import { getChatGPTUser } from '../../chatgpt-auth';
export async function GET(){ const user = await getChatGPTUser(); return Response.json(user ? {email:user.email,userId:user.userId} : {email:null},{headers:{'Cache-Control':'no-store'}}); }
