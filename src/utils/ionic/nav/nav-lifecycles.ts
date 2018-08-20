export interface NavLifecycles{
    //? significa que o método não precisa ser impementado
    //metodo que é chamado pelo ionic ao criar a página, 
    //isso é um artifício para nãocorrer o risco de definir o metodo com um nome 
    //errado, e não saber pq não funciona...
    ionViewDidLoad?():void;
}