import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'icons/*.png'],
      manifest: {
        name: 'Oleh-Oleh Semarang',
        short_name: 'Oleh2 SMG',
        description: 'Aplikasi katalog oleh-oleh khas Semarang',
        theme_color: '#667eea',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png', // ← DIPERBAIKI (bukan 'image/semar.png')
            purpose: 'any maskable'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png', // ← DIPERBAIKI
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // Cache semua file statis saat build
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}'],
        
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        
        // Offline fallback
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api/],
        
        runtimeCaching: [
          // ========== API SUPABASE (PRIORITAS NETWORK) ==========
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/rest\/v1\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24 jam
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
              networkTimeoutSeconds: 10 // Timeout 10 detik, lalu pakai cache
            }
          },
          
          // ========== GAMBAR SUPABASE STORAGE ==========
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/storage\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'supabase-images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 hari
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          
          // ========== GOOGLE FONTS CSS ==========
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 tahun
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          
          // ========== GOOGLE FONTS FILES ==========
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 tahun
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          
          // ========== GAMBAR UNSPLASH ==========
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 hari
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          
          // ========== GAMBAR LOKAL & EKSTERNAL LAINNYA ==========
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 hari
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          
          // ========== CSS & JS FILES ==========
          {
            urlPattern: /\.(?:css|js)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 hari
              }
            }
          }
        ]
      },
      
      // Development mode
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  
  // Optimasi build
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'lucide': ['lucide-react']
        }
      }
    }
  }
})