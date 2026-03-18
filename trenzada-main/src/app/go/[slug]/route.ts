import * as admin from 'firebase-admin';

// Inicializa o Admin SDK com segurança absoluta para ambiente Next.js
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
        });
    } catch (e) {
        console.error("Erro ao inicializar Firebase Admin:", e);
    }
}

const db = admin.firestore();

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const slug = params.slug;

    // --- TRAVAS DE SEGURANÇA CONTRA LOOP (LEI 1) ---
    // Impede que o sistema tente processar arquivos de sistema ou slugs vazios
    const forbiddenSlugs = ['favicon.ico', 'undefined', 'null', 'api', '_next'];
    if (!slug || forbiddenSlugs.includes(slug) || slug.includes('.')) {
        return new Response(null, { status: 404 });
    }

    try {
        const linkRef = db.collection('links').doc(slug);
        const doc = await linkRef.get();

        // Se o slug não existir no banco, apenas retorna 404 em vez de redirecionar para a home (evita loop)
        if (!doc.exists) {
            console.warn(`[Redirect] Slug não encontrado: ${slug}`);
            return new Response("Link de rastreio não encontrado.", { status: 404 });
        }

        const data = doc.data();
        const destination = data?.originalUrl;

        // Se por algum motivo o link no banco for o próprio site, mata o loop aqui
        if (!destination || destination.includes(`/go/${slug}`)) {
            return new Response("URL de destino inválida ou circular.", { status: 400 });
        }

        // Incremento atômico de cliques
        // Usamos await apenas na atualização para garantir a métrica antes do redirect
        await linkRef.update({
            clicks: admin.firestore.FieldValue.increment(1),
            lastClickAt: admin.firestore.Timestamp.now()
        });

        // Redirecionamento 302 com Headers de controle de cache (LEI 7)
        return new Response(null, {
            status: 302,
            headers: {
                'Location': destination,
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });

    } catch (error) {
        console.error("Erro crítico no sistema de redirect:", error);
        // Em caso de erro técnico, não redirecionamos para evitar loops infinitos no navegador
        return new Response("Erro interno de redirecionamento.", { status: 500 });
    }
}