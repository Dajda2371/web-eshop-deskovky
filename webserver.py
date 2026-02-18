from http.server import HTTPServer, SimpleHTTPRequestHandler
import json

class MyHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers.get('Content-Length'))
        data = self.rfile.read(length).decode('utf-8')
        
        path = self.path.lstrip('/')
        if '..' in path: return

        with open(path, 'w', encoding='utf-8') as f:
            json.dump(json.loads(data), f, indent=4)
            
        self.send_response(200)
        self.end_headers()

if __name__ == '__main__':
    print("Serving on port 8000...")
    HTTPServer(('', 8000), MyHandler).serve_forever()
