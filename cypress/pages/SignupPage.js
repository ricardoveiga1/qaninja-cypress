

class SignuPage {

    go(){
        //cy.viewport(1440, 900) - view port por padrão do cypress é um, mas pdoemos configurar no cypress.json
        cy.visit('/')//baseURL no cypress.json
        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(deliver){
        cy.get('input[name="name"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)


        //Preencher cep válido e buscar pelo botão
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()
        //Preencher numero e complemento
        cy.get('input[name=address-number]').type(deliver.address.number)
        cy.get('input[name=address-details]').type(deliver.address.details)

        //Maches endereço
        cy.get('input[name=address]').should('have.value', deliver.address.street)
        cy.get('input[name=district]').should('have.value', deliver.address.district)
        cy.get('input[name=city-uf]').should('have.value', deliver.address.city_state)

        cy.contains('.delivery-method li', deliver.delivery_method).click()

        cy.get('input[accept^="image"] ').attachFile('/images/' + deliver.cnh) 
    }

    submit(){
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage){
        cy.get('.swal2-container .swal2-html-container')
        .should('have.text', expectedMessage)
    }

    alertMessageShouldBe(expectedMessage){
        cy.get('.alert-error')
        .should('have.text', expectedMessage)
    }


}


// export default SignupPage;
export default new SignuPage;