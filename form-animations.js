document.addEventListener('DOMContentLoaded', function () {
  // تحديد العناصر
  const formGroups = document.querySelectorAll('.form-group');
  const inputs = document.querySelectorAll('.form-group input');
  const labels = document.querySelectorAll('.form-group label');
  const icons = document.querySelectorAll('.form-group i:not(.password-toggle)');
  const form = document.querySelector('form');
  const submitButton = document.querySelector('.signup-button, .login-button');

  // تحريك التسميات عند التركيز
  inputs.forEach((input, index) => {
    // تحريك التسمية إذا كان الحقل يحتوي على قيمة
    if (input.value) {
      labels[index].classList.add('active');
    }

    // معالجة التركيز
    input.addEventListener('focus', () => {
      labels[index].classList.add('active', 'highlight');
      icons[index].classList.add('active');
      formGroups[index].classList.add('focused');
    });

    // معالجة إزالة التركيز
    input.addEventListener('blur', () => {
      labels[index].classList.remove('highlight');
      icons[index].classList.remove('active');
      formGroups[index].classList.remove('focused');

      if (!input.value) {
        labels[index].classList.remove('active');
      }
    });

    // معالجة الإدخال
    input.addEventListener('input', () => {
      if (input.value) {
        labels[index].classList.add('active');
      } else {
        labels[index].classList.remove('active');
      }
    });
  });

  // تأثير النقر على الزر
  submitButton?.addEventListener('mousedown', function () {
    this.classList.add('clicked');
  });

  submitButton?.addEventListener('mouseup', function () {
    this.classList.remove('clicked');
  });

  // تأثيرات التحقق من صحة النموذج
  form?.addEventListener('submit', function (e) {
    e.preventDefault();

    submitButton.classList.add('loading');

    // محاكاة إرسال النموذج
    setTimeout(() => {
      submitButton.classList.remove('loading');
      submitButton.classList.add('success');

      // إعادة تعيين حالة الزر
      setTimeout(() => {
        submitButton.classList.remove('success');
      }, 2000);
    }, 1500);
  });

  // تأثير موجة النقر
  function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();

    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.classList.add('ripple');

    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(ripple);
  }

  // إضافة تأثير الموجة للزر
  submitButton?.addEventListener('click', createRipple);
});

// تحسين تأثيرات كلمة المرور
document.querySelectorAll('.password-toggle').forEach(toggle => {
  toggle.addEventListener('click', function () {
    const input = this.previousElementSibling.previousElementSibling;
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;

    // تحديث الأيقونة
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');

    // تأثير بصري
    this.classList.add('clicked');
    setTimeout(() => this.classList.remove('clicked'), 200);
  });
});

// إضافة تأثيرات للحقول
document.querySelectorAll('.form-group input').forEach(input => {
  input.addEventListener('focus', function () {
    this.parentElement.classList.add('input-focused');
  });

  input.addEventListener('blur', function () {
    if (!this.value) {
      this.parentElement.classList.remove('input-focused');
    }
  });

  // تحقق تلقائي من صحة الإدخال
  input.addEventListener('input', function () {
    if (this.value.length > 0) {
      this.classList.add('has-value');
    } else {
      this.classList.remove('has-value');
    }
  });
});