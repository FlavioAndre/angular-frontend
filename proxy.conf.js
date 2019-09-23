const proxy = [
  {
    context: ['/api'],
    target: 'https://curso-angular-datainfo.herokuapp.com/',
    'secure': false,
    pathRewrite: { '^/api': '' },
    "changeOrigin": true
  },
  {
    context: ['/cep-ws'],
    target: 'https://viacep.com.br/ws/',
    'secure': false,
    pathRewrite: { '^/cep-ws': '' },
    "changeOrigin": true
  },
];
module.exports = proxy;
