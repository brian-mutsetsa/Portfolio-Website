import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        robotics: resolve(__dirname, 'robotics.html'),
        software: resolve(__dirname, 'software.html'),
        employeeManagement: resolve(__dirname, 'projects/employee-management.html'),
      },
    },
  },
})
