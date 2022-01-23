

//import SignupPage from '../pages/SignupPage'
import signup from '../pages/SignupPage'

describe('Cadastro', ()=>{

    before(function() {
        cy.log ('Tudo aqui é executado uma vez ANTES de TODOS os casos de testes')
    })

    beforeEach(function() {
        cy.log ('Tudo aqui é executado SEMPRE ANTES de CADA caso de testes')
    })

    after(function() {
        cy.log ('Tudo aqui é executado uma vez DEPOIS de TODOS os casos de testes')
    })

    afterEach(function() {
        cy.log ('Tudo aqui é executado SEMPRE DEPOIS de CADA caso de testes')
    })

    it('Usuário deve se tornar um entregador', ()=>{
    
        var deliver = {
            name: 'Ricardo Veiga',
            cpf: '13255262070',
            email: 'ricardo@gmail.com',
            whatsapp: '21987652527',
            address: {
                postalcode: '04534011',
                street: 'Rua Joaquim Floriano',
                number: '10000',
                details: 'Apt 142',
                district: 'Itaim Bibi',
                city_state: 'São Paulo/SP'
            },
            delivery_method: "Moto",
            cnh: 'cnh-digital.jpg'
        }

        signup.go()
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)

        //localizador com apenas a div método fillForm
        //div[class="swal2-html-container"]
        //pai e filho
        //.swal2-container div[class="swal2-html-container"]
        //variável imutável
        
        //validação do modal
        // cy.get('.swal2-container .swal2-html-container')
        // .should('have.text', expectedMessage)

    })

    it('CPF inválido', ()=>{

        var deliver = {
            name: 'Ricardo Veiga',
            cpf: '13255262070AA',
            email: 'ricardo@gmail.com',
            whatsapp: '21987652527',
            address: {
                postalcode: '04534011',
                street: 'Rua Joaquim Floriano',
                number: '10000',
                details: 'Apt 142',
                district: 'Itaim Bibi',
                city_state: 'São Paulo/SP'
            },
            delivery_method: "Moto",
            cnh: 'cnh-digital.jpg'
        }

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')

    })

  
})