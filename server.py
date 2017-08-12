from SimpleHTTPServer import SimpleHTTPRequestHandler
import SocketServer
import urllib2
import os.path

SERVER = "http://127.0.0.1:8081"
PATH = "tem"

class S(SimpleHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        print "get request %s" % (self.path)
        self._set_headers()

        if os.path.isfile(self.path[1:]):
            f = open(self.path[1:])
            self.wfile.write(f.read())
            f.close()
        else:
            file_name = self.path[len(PATH)+2:]
            domains = file_name.split('/')
            domain = domains[0].split(':')[0] + "://" + domains[0].split(':')[1]
            for i in range(1,len(domains)):
                domain += '/' + domains[i]
            #download file
            response = urllib2.urlopen(domain)
            html = response.read()
            f = open(PATH + '/' + file_name, 'w+')
            f.write(html)
            f.close()
            f = open(PATH + '/' +file_name, 'r')
            self.wfile.write(f.read())
            f.close()

    def do_POST(self):
        content_len = int(self.headers.getheader('content-length', 0))
        post_body = self.rfile.read(content_len)
        print "post: " + post_body

        #construct folder and index file name
        domains = post_body.split('/')
        folder = domains[0] + domains[2]
        file_name = folder
        if not os.path.exists(PATH+'/'+folder):
            os.makedirs(PATH+'/'+folder)
        for i in range(3, len(domains)):
            file_name += '/' + domains[i]
            if i < len(domains) - 1:
                if not os.path.exists(PATH+'/'+file_name):
                    os.makedirs(PATH+"/"+file_name)
        if '.' not in domains[-1]:
            if not os.path.exists(PATH+'/'+file_name):
                os.makedirs(PATH+"/"+file_name)
            file_name += "index.html"

        #download file
        response = urllib2.urlopen(post_body)
        html = response.read()
        f = open(PATH + '/' + file_name, 'w+')
        f.write(html)
        #f.write("console.log('inject!!!!')")
        f.close()

        #send file position back
        self._set_headers()
        self.wfile.write(SERVER+"/"+PATH+"/"+file_name)
        #test_data = simplejson.loads(post_body)
        #print "post_body(%s)" % (test_data)
        #return SimpleHTTPRequestHandler.do_POST(self)

def run(handler_class=S, port=8081):
    httpd = SocketServer.TCPServer(("", port), handler_class)
    print 'Starting httpd...'
    httpd.serve_forever()

run()
