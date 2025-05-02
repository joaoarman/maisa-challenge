# Sobre o projeto

## Como rodar?
1. Renomear o arquivo .env.example para .env

2. Adicionar valores para as variaveis de ambiente do .env. 
Segue uma sugestão caso queira copiar e colar:

    API_PORT=3000

    FRONTEND_PORT=5173

    MYSQL_PORT=3306
    
    MYSQL_DATABASE=maisaedu
    
    MYSQL_ROOT_PASSWORD=adminroot
    
    MYSQL_USER=admin
    
    MYSQL_PASSWORD=admin1234
    
    JWT_SECRET=chavesecreta

3. Na pasta raiz do projeto, rode: ```docker compose up --build -d```

4. No navegador, acesse ```http://localhost:{FRONTEND_PORT}/```

5. Uma tela de login será exibida. O sistema conta com sistema de autenticação com JWT.

6. Utilize um dos logins abaixo para acessar (diferentes autorizações):
    - Usuário gerente administrador (permissões para criar, editar, exluir e visualizar alunos cadastrados)

        **• Login:** admin@example.com

        **• Senha:** admin123   

    - Usuário gerente comum (permissões para visualizar e cadatrar alunos) 

        **• Login:** manager@example.com

        **• Senha:** naoadmin123

## Informações relevantes
- Os únicos usuários que possuem login no sistema são os gestores (managers). 
- Os logins de managers estão definidos diretamente nas seeders, não foi implementada uma rota para cadastrar novos managers.
- Managers que possuem a flag ```ìsAdmin``` desativada no banco de dados só podem cadastrar e visualizar alunos.
- Só podem editar e deletar alunos os managers que possuem a flag ```ìsAdmin``` ativada no banco de dados.
- No canto superior direito da tela, o manager pode fazer o logout no sistema. 

- A listagem de alunos é paginada.
- O campo de busca, em cima da tabela que exibe os alunos, faz as buscas pelo nome do estudante.
- RA, CPF e email são únicos para cada estudante. O sistema informará a duplicidade do campo e impedirá o cadastro caso um novo aluno seja cadastrado com as mesmas informações.
- Email e nome do estudante podem ser editados, RA e CPF não.