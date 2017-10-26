# coding=utf8
from tornado import web, gen, ioloop, options
import qrcode

import sys
import cStringIO
reload(sys)
sys.setdefaultencoding('utf8')


class QRCode(web.RequestHandler):
    def set_default_headers(self):
        self.set_header('Server', 'Secret!')

    @gen.coroutine
    def generate_qrcode(self, href):
        qr_string = cStringIO.StringIO()
        img = qrcode.make(href)
        img.save(qr_string, 'png')
        src = "data:image/png;base64," + qr_string.getvalue().encode('base64').replace("\n", "")
        #raise gen.Return(src)
        return src

    @gen.coroutine
    def get(self):
        # 简单跨域
        self.add_header("Access-Control-Allow-Origin", '*')
        href = self.get_argument("href", None)
        if not href:
            self.write({
                "msg": "No Valid URL Found!"
            })
        else:
            src = yield self.generate_qrcode(href)
            self.write({
                'src': src
            })


app = web.Application(handlers=[(r"/qrcode/generator", QRCode)],
                      autoreload=True)


if __name__ == '__main__':
    options.define('port', default=5000, help="Running port")
    options.define('address', default='127.0.0.1', help='Running address')
    options.parse_command_line()
    app.listen(options.options.port, options.options.address)
    ioloop.IOLoop.current().start()


