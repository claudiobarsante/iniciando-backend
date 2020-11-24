//Na realidade isso é um override na tipagem
//Isso é para poder modificar ou adicionar um tipo a uma biblioteca
//q eu estou utilizando, no caso e no Express que eu quero adicionar
//o tipo 'user'
//o .d na extensão é para especificar que é um arquivo com definição de tipos
declare namespace Express {
  //estou sobrescrevendo a exportação do Request q já exite dentro do Express
  //então ele não vai substituir e sim adicionar no Express , no caso aqui o 'user'
  //que tem a propriedade 'id' do tipo string
  export interface Request {
    user: {
      id: string;
    };
  }
}
