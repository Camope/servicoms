<template>
  <div class="card">
    <div class="p-menubar p-component footer">
      <div class="col-12">
        <div class="flex justify-content-evenly">
          <router-link :to="{ name: 'comisiones' }" class="footer-links"><span>Home</span></router-link>
          <router-link :to="{ name: 'about' }" class="footer-links"><span>Privacidad y protección de
              datos</span></router-link>
          <router-link :to="{ name: 'about' }" class="footer-links"><span>Aviso legal</span></router-link>
          <a href="mailto:admin@micorreo.com" class="footer-links">
            <div class="flex align-items-center">
              <i class="pi pi-envelope mr-2"></i>
              <span>Contacto</span>
            </div>
          </a>
        </div>
      </div>
      <div class="col-12">
        <span>&copy; ServiComs DIM XLV 2023. Todos los derechos reservados.</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer {
  flex-wrap: wrap;
  text-align: center;
}

.footer-links {
  text-decoration: none;
  color: #495057;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.footer-links:hover {
  background-color: var(--gray-200);
}
</style>