from http.server import HTTPServer, SimpleHTTPRequestHandler

class MyHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers.get('Content-Length'))
        data = self.rfile.read(length).decode('utf-8')
        
        path = self.path.lstrip('/')
        if '..' in path: return

        try:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(data)
            self.send_response(200)
        except:
            self.send_response(500)
        self.end_headers()

if __name__ == '__main__':
    print("Serving on port 8000...")
    HTTPServer(('', 8000), MyHandler).serve_forever()
