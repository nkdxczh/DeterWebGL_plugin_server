from SimpleHTTPServer import SimpleHTTPRequestHandler
import SocketServer
import urllib2

class S(SimpleHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        print "get request %s" % (self.path)
        self._set_headers()
        f = open(self.path[1:])
        self.wfile.write(f.read())
        f.close()

    def do_POST(self):
        content_len = int(self.headers.getheader('content-length', 0))
        post_body = self.rfile.read(content_len)
        print "post: " + post_body
        response = urllib2.urlopen(post_body)
        html = response.read()
        file_name = post_body.split('/')[-1]
        f = open('tem/' + file_name, 'w+')
        f.write(html)
        f.write("console.log('inject!!!!')")
        f.close()
        self._set_headers()
        self.wfile.write('http://127.0.0.1:8081/tem/'+file_name)
        #test_data = simplejson.loads(post_body)
        #print "post_body(%s)" % (test_data)
        #return SimpleHTTPRequestHandler.do_POST(self)

def run(handler_class=S, port=8081):
    httpd = SocketServer.TCPServer(("", port), handler_class)
    print 'Starting httpd...'
    httpd.serve_forever()

run()
