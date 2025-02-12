# Uderstanding & Optimizing React

### Bagaimana React Bekerja?

React membuat sebuah pohon komponen (component tree), yang merupakan representasi
virtual dari antarmuka pengguna. Pohon ini disebut sebagai Virtual DOM. Saat terjadi
perubahan pada data atau state, React akan membandingkan Virtual DOM baru dengan yang
lama menggunakan Reconciliation Algorithm dan hanya memperbarui bagian yang mengalami
perubahan pada Real DOM. Hal ini membuat React sangat efisien dibandingkan manipulasi
DOM secara langsung.
