import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],build:{outDir:'standalone-dist',target:'es2020'},server:{host:'0.0.0.0',port:5174,proxy:{'/api':{target:'http://127.0.0.1:8788',changeOrigin:false},'/ws':{target:'ws://127.0.0.1:8788',ws:true,changeOrigin:false}}}});
