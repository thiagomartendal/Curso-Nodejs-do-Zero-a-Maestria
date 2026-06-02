// O node interpreta cada linha do arquivo javascript de cima para baixo

function a() {
    console.log('Executando a()')
}

function b() {
    console.log('Executando b()')
}

function c() {
    console.log('Executando c()')
    a()
    b()
}

c()