// Optional local preview with byte ranges for video seeking. No dependencies.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname,'../dist');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.pdf':'application/pdf','.mp4':'video/mp4'};
const server = http.createServer((req,res)=>{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end();}
  let target;
  try{const requested=decodeURIComponent(new URL(req.url,'http://localhost').pathname);target=path.resolve(root,'.'+(requested==='/'?'/index.html':requested));}catch{res.writeHead(400);return res.end();}
  if(!target.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  fs.stat(target,(err,stat)=>{
    if(err||!stat.isFile()){res.writeHead(404);return res.end();}
    const headers={'Content-Type':types[path.extname(target)]||'application/octet-stream','Accept-Ranges':'bytes','Cache-Control':'no-cache'};
    let start=0,end=stat.size-1,status=200;
    if(req.headers.range){
      const match=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range);
      if(!match){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});return res.end();}
      start=Number(match[1]);end=match[2]?Math.min(Number(match[2]),end):end;
      if(start>end||start>=stat.size){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});return res.end();}
      status=206;headers['Content-Range']=`bytes ${start}-${end}/${stat.size}`;
    }
    headers['Content-Length']=end-start+1;res.writeHead(status,headers);
    if(req.method==='HEAD')return res.end();
    const stream=fs.createReadStream(target,{start,end});stream.on('error',()=>res.destroy());req.on('close',()=>stream.destroy());stream.pipe(res);
  });
});
server.listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
