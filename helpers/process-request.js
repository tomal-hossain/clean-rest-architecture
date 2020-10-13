export async function processRequest(req) {
    let body = []
    await req.on('data', (chunk) => {
        body.push(chunk)
    })
    .on('end', () => {
        body = Buffer.concat(body).toString()
    })
    let pathOrigin;
    let params;
    try {
        let paths = req.url.split('/')
        pathOrigin =  `/${paths[1]}/${paths[2]}`
        if (paths.length > 2) {
            params = paths[3]
        }
    } catch {
        pathOrigin = null
        params = null
    }
    return Object.freeze({
       path: pathOrigin,
       params,
       method: req.method,
       body
    })
}
