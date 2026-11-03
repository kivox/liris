import { mount } from 'svelte';
import App from './App.svelte';

const target = document.getElementById('liris-app-root') ?? document.body;

mount(App, { target });
