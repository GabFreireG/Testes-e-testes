<script lang="ts">
	import { onMount } from 'svelte';
	import { API, listarTarefas } from '#lib/api.ts';
	import CartaoTarefa from '#lib/components/CartaoTarefa.svelte';
	import type { Tarefa } from '../tipos';

	let tarefas = $state<Tarefa[]>([]);
	let erro = $state('');
	let carregando = $state(true);

	onMount(async () => {
		try {
			tarefas = await listarTarefas();
		} catch (e) {
			erro = e instanceof Error ? e.message : String(e);
		} finally {
			carregando = false;
		}
	});
</script>

<svelte:head>
	<title>Tarefas | Rapazes do Dia</title>
	<meta name="description" content="Lista de tarefas do projeto Rapazes do Dia." />
</svelte:head>

<main>
	<header class="cabecalho">
		<div>
			<p class="sobretitulo">RAPAZES DO DIA</p>
			<h1>Lista de tarefas</h1>
			<p class="introducao">Acompanhe as tarefas, seus responsáveis, prazos e prioridades.</p>
		</div>
		{#if !carregando && !erro}
			<p class="contador">{tarefas.length} {tarefas.length === 1 ? 'tarefa' : 'tarefas'}</p>
		{/if}
	</header>

	{#if carregando}
		<section class="mensagem" aria-live="polite"><span class="indicador"></span>Carregando tarefas da API…</section>
	{:else if erro}
		<section class="mensagem erro" role="alert">
			<h2>Não foi possível carregar as tarefas</h2>
			<p>{erro}</p>
			<p>Verifique se o servidor da API está rodando em <code>{API}</code>. No terminal, execute <code>npm run api</code>.</p>
		</section>
	{:else if tarefas.length === 0}
		<section class="mensagem vazia">
			<h2>Nenhuma tarefa encontrada</h2>
			<p>Quando houver tarefas cadastradas na API, elas aparecerão aqui.</p>
		</section>
	{:else}
		<section class="grade" aria-label="Tarefas">
			{#each tarefas as tarefa (tarefa.id)}
				<CartaoTarefa {tarefa} />
			{/each}
		</section>
	{/if}
</main>

<style>
	:global(body) { margin: 0; background: #f8fafc; color: #0f172a; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
	main { max-width: 72rem; margin: 0 auto; padding: 3rem 1.25rem 4rem; }
	.cabecalho { display: flex; align-items: flex-end; justify-content: space-between; gap: 1.5rem; margin-bottom: 2rem; }
	.sobretitulo { margin: 0 0 .5rem; color: #2563eb; font-size: .78rem; font-weight: 800; letter-spacing: .12em; }
	h1 { margin: 0; font-size: clamp(2rem, 5vw, 3rem); letter-spacing: -.04em; }
	.introducao { margin: .65rem 0 0; color: #64748b; line-height: 1.6; }
	.contador { flex-shrink: 0; margin: 0; padding: .5rem .8rem; border-radius: 999px; background: #e2e8f0; color: #334155; font-weight: 650; font-size: .9rem; }
	.grade { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 19rem), 1fr)); gap: 1rem; align-items: stretch; }
	.mensagem { padding: 1.5rem; border: 1px solid #e2e8f0; border-radius: 1rem; background: white; color: #475569; line-height: 1.6; }
	.mensagem h2 { margin: 0 0 .5rem; color: #0f172a; font-size: 1.15rem; }
	.mensagem p { margin: .4rem 0 0; }
	.erro { border-color: #fecaca; background: #fffafa; }
	.erro h2 { color: #b91c1c; }
	code { padding: .1rem .3rem; border-radius: .25rem; background: #f1f5f9; font-size: .9em; }
	.indicador { display: inline-block; width: .65rem; height: .65rem; margin-right: .6rem; border-radius: 50%; background: #2563eb; }
	@media (max-width: 36rem) { main { padding: 2rem 1rem; } .cabecalho { align-items: flex-start; flex-direction: column; } }
</style>
