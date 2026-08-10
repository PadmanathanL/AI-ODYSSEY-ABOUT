/* ============================================================
   AI Odyssey 2026 — Registration Page Interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Mobile menu ---------- */
  function initMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ---------- Scroll navbar ---------- */
  function initNav() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* ---------- Payment screenshot upload + preview ---------- */
  function initUpload() {
    const dropzone = document.getElementById('upload-dropzone');
    const fileInput = document.getElementById('payment-proof');
    const content = document.getElementById('upload-content');
    const previewWrap = document.getElementById('upload-preview');
    const previewImg = document.getElementById('preview-img');
    const removeBtn = document.getElementById('upload-remove');
    if (!dropzone || !fileInput || !previewWrap || !previewImg) return;

    // Click on the dropzone triggers the hidden file input.
    dropzone.addEventListener('click', (e) => {
      if (e.target.closest('#upload-remove')) return;
      fileInput.click();
    });

    // Drag & drop support.
    ['dragenter', 'dragover'].forEach((evt) => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragging');
      });
    });
    ['dragleave', 'drop'].forEach((evt) => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragging');
      });
    });
    dropzone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files && files.length) {
        fileInput.files = files;
        handleFile(files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length) {
        handleFile(fileInput.files[0]);
      }
    });

    function handleFile(file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (PNG, JPG, etc.).');
        fileInput.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File is too large. Maximum size is 5MB.');
        fileInput.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImg.src = e.target.result;
        content.style.display = 'none';
        previewWrap.hidden = false;
      };
      reader.readAsDataURL(file);
    }

    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.value = '';
      previewImg.src = '';
      previewWrap.hidden = true;
      content.style.display = '';
    });
  }

  /* ---------- Registration form ---------- */
  function initForm() {
    const form = document.getElementById('contact-form');
    const note = document.getElementById('form-note');
    if (!form || !note) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const team = (data.get('team') || '').trim();
      const phone = (data.get('phone') || '').trim();
      const email = (data.get('email') || '').trim();
      const s1 = (data.get('s1_name') || '').trim();
      const s2 = (data.get('s2_name') || '').trim();
      const s3 = (data.get('s3_name') || '').trim();

      // Basic phone validation.
      if (phone && phone.replace(/\D/g, '').length < 10) {
        note.textContent = '⚠️ Please enter a valid contact number (at least 10 digits).';
        note.style.color = '#ff6b6b';
        return;
      }

      // Teams must have at least 2 students.
      let studentCount = 0;
      if (s1) studentCount++;
      if (s2) studentCount++;
      if (s3) studentCount++;
      if (studentCount < 2) {
        note.textContent = '⚠️ A team must have at least 2 students.';
        note.style.color = '#ff6b6b';
        return;
      }

      // Payment proof is required.
      const proof = document.getElementById('payment-proof');
      if (!proof || !proof.files || !proof.files.length) {
        note.textContent = '⚠️ Please upload your payment screenshot.';
        note.style.color = '#ff6b6b';
        return;
      }

      note.textContent = `🎉 Thanks, ${team ? team + ' team' : 'team'}! Your registration request has been received. We'll be in touch soon.`;
      note.style.color = 'var(--primary)';
      form.reset();

      // Reset upload preview.
      const previewWrap = document.getElementById('upload-preview');
      const content = document.getElementById('upload-content');
      const previewImg = document.getElementById('preview-img');
      if (previewWrap && content && previewImg) {
        previewWrap.hidden = true;
        previewImg.src = '';
        content.style.display = '';
      }

      setTimeout(() => { note.textContent = ''; }, 6000);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initNav();
    initUpload();
    initForm();
  });
})();
