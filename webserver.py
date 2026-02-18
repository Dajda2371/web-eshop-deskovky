from http.server import HTTPServer, SimpleHTTPRequestHandler

class MyHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers.get('Content-Length'))
        data = self.rfile.read(length).decode('utf-8')
        
        path = self.path.lstrip('/')
        
        # Basic security: prevent traversing up directories
        if '..' in path:
            self.send_response(403)
            self.end_headers()
            return

        try:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(data)
            self.send_response(200)
        except Exception as e:
            print(f"Error writing file: {e}")
            self.send_response(500)
        
        self.end_headers()

if __name__ == '__main__':
    print("Serving on port 8000...")
    HTTPServer(('', 8000), MyHandler).serve_forever()
