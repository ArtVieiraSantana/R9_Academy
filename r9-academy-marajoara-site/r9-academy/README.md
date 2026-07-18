# R9 Academy Marajoara — site institucional

Site institucional da **R9 Academy Marajoara**, escolinha de futebol no
bairro do Marajoara, zona sul de São Paulo (R. Marcelino Zonta, 316 - Vila
Sofia, São Paulo - SP, 04688-000).

- **Frontend:** Angular 20 (standalone components), com animações de entrada,
  scroll reveal, header sticky, botão flutuante de WhatsApp e formulário de
  contato. Paleta de marca em azul, amarelo e branco.
- **Backend:** Java + Spring Boot 3, expondo só um endpoint (`POST /api/contato`)
  para receber o formulário de contato. **Sem banco de dados** — a mensagem é
  validada e registrada no log do servidor.

```
r9-academy/
├── backend/     -> API Spring Boot
└── frontend/    -> Site Angular
```

---

## 1. Rodando localmente

### Backend
Pré-requisitos: Java 17+ e Maven instalados.

```bash
cd backend
mvn spring-boot:run
```

A API sobe em `http://localhost:8080`. Teste com:
`http://localhost:8080/api/health`

### Frontend
Pré-requisitos: Node.js 20+ instalado.

```bash
cd frontend
npm install
npm start
```

O site abre em `http://localhost:4200`.

**Antes de tudo**, edite estes dois arquivos e troque pelo número real (com
DDI 55 + DDD + número, sem espaços ou traços):

- `frontend/src/environments/environment.ts`
- `frontend/src/environments/environment.prod.ts`

```ts
whatsappNumero: '5511999999999',
```

---

## 2. Passo a passo para colocar o site no ar de graça

A ideia: **frontend na Netlify** (hospedagem de site estático gratuita) e
**backend no Render** (hospedagem de API Java gratuita). Nenhum dos dois pede
cartão de crédito no plano free.

### Passo 0 — Suba o código para o GitHub
1. Crie uma conta em [github.com](https://github.com) (se ainda não tiver).
2. Crie um repositório novo, por exemplo `r9-academy-marajoara`.
3. Dentro da pasta do projeto (a que contém `backend` e `frontend`), rode:
   ```bash
   git init
   git add .
   git commit -m "Site R9 Academy Marajoara"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/r9-academy-marajoara.git
   git push -u origin main
   ```

### Passo 1 — Backend no Render (grátis)
1. Crie uma conta em [render.com](https://render.com) usando o GitHub.
2. Clique em **New +** → **Web Service**.
3. Selecione o repositório `r9-academy-marajoara`.
4. Configure:
   - **Root Directory:** `backend`
   - **Runtime:** `Java`
   - **Build Command:** `mvn clean package -DskipTests`
   - **Start Command:** `java -jar target/site-1.0.0.jar`
   - **Instance Type:** `Free`
5. Clique em **Create Web Service** e aguarde o build (leva alguns minutos).
6. Quando terminar, o Render mostra uma URL pública, algo como
   `https://r9-academy-marajoara-api.onrender.com`. **Guarde essa URL.**

> ⚠️ No plano free, o Render "dorme" o serviço depois de um tempo sem uso.
> A primeira requisição depois disso pode demorar ~30-50 segundos para
> responder — normal, é o servidor "acordando".

### Passo 2 — Aponte o frontend para o backend
Antes de publicar o site, edite:

`frontend/src/environments/environment.prod.ts`

```ts
export const environment = {
  production: true,
  apiUrl: 'https://r9-academy-marajoara-api.onrender.com', // URL do Passo 1
  whatsappNumero: '5511999999999',
};
```

E ajuste também o cabeçalho `connect-src` da política de segurança em
`frontend/src/index.html` para incluir essa mesma URL, e o `CorsConfig.java`
do backend para liberar o domínio final do frontend (veja a seção 3).

Suba essa alteração para o GitHub:
```bash
git add .
git commit -m "Configura URL da API em producao"
git push
```

### Passo 3 — Frontend na Netlify (grátis)
1. Crie uma conta em [netlify.com](https://netlify.com) usando o GitHub.
2. Clique em **Add new site** → **Import an existing project**.
3. Selecione o repositório `r9-academy-marajoara`.
4. Configure:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist/r9-academy-marajoara-site/browser`
5. Clique em **Deploy site**. Em 1-2 minutos o site está no ar, em um endereço
   tipo `https://nome-aleatorio.netlify.app`.
6. (Opcional) Em **Site configuration → Domain management** dá para colocar
   um domínio próprio, ou trocar o subdomínio `.netlify.app` por um nome
   melhor, tipo `r9academymarajoara.netlify.app` — isso também é grátis.

### Passo 4 — Teste tudo
1. Abra o link da Netlify.
2. Preencha o formulário de contato e envie.
3. Se aparecer "Mensagem enviada!", está tudo funcionando.
4. Clique no botão flutuante de WhatsApp e confira se abre a conversa certa.

### Alternativas equivalentes (caso prefira)
- Frontend: **Vercel** ou **GitHub Pages** também são gratuitos e funcionam
  do mesmo jeito (apontando para a pasta `frontend`).
- Backend: **Railway** e **Fly.io** têm planos gratuitos parecidos com o
  Render.

---

## 3. Segurança — o que já vem pronto e o que ajustar em produção

O projeto já inclui uma camada básica de proteção, pensada para um site
institucional sem banco de dados:

- **CORS restrito** (`CorsConfig.java`): só origens específicas podem chamar
  a API. **Antes de publicar**, troque `r9academymarajoara.com.br` pelo
  domínio real (ou pelo subdomínio da Netlify/Vercel) e remova os domínios
  de teste que não forem usados.
- **Cabeçalhos de segurança HTTP** (`SecurityHeadersFilter.java`): `X-Frame-Options`,
  `X-Content-Type-Options`, `Referrer-Policy` e `Permissions-Policy` em toda
  resposta da API.
- **Content-Security-Policy** no `index.html` do frontend, restringindo de
  onde scripts, estilos e conexões podem vir.
- **Limitador de requisições** (`RateLimitFilter.java`): no máximo 8 envios
  de formulário por IP a cada 60 segundos, para dificultar spam e ataques
  automatizados no `/api/contato`.
- **Validação de dados** (`ContactRequest.java` + Bean Validation): todos os
  campos têm tamanho máximo e formato validados no servidor, não só no
  formulário.
- **Campo honeypot**: um campo invisível no formulário que só robôs
  preenchem; se vier preenchido, a mensagem é descartada silenciosamente.
- **Sem stacktrace exposto** (`application.properties`): erros não vazam
  detalhes internos do servidor.
- **Sanitização de log**: dados do formulário têm quebras de linha removidas
  antes de irem para o log, evitando "log forging".

Itens que **você** ainda precisa ajustar ao publicar:
- Trocar os domínios de exemplo no `CorsConfig.java` pelo domínio real do site.
- Trocar `SEU-BACKEND.onrender.com` (environment.prod.ts) e o `connect-src`
  do CSP (`index.html`) pela URL real da API.
- Usar sempre HTTPS em produção (Netlify, Vercel e Render já fazem isso por
  padrão).

---

## 4. Próximos passos sugeridos (não obrigatórios)
- Trocar as fotos de exemplo da galeria pelas fotos reais dos treinos
  (`frontend/src/app/components/gallery/gallery.component.ts`).
- Se um dia quiser guardar as mensagens do formulário em vez de só logar,
  dá pra plugar um envio de e-mail (JavaMailSender) dentro de
  `ContactController.receberMensagem()` — sem precisar de banco de dados.
