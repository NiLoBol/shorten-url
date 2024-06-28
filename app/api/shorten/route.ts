
  export async function POST(req:Request) {
    const {url} = await req.json()
    
    const response = await fetch('https://cleanuri.com/api/v1/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ url })
      }).then(response => response.json())
    
    return Response.json(response)
  }