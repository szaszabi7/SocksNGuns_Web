<script>

</script>

<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-md">
            <!-- logo -->
            <h3 class="text-2xl font-bold text-center">Bejelentkezés</h3>
            <form>
                <div class="mt-4">
                    <div>
                        <label class="block" for="email">Email</label>
                                <input type="text" placeholder="Email"
                                    class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    </div>
                    <div class="mt-4">
                        <label class="block">Jelszó</label>
                                <input type="password" placeholder="Jelszó"
                                    class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    </div>
                    <div class="flex items-baseline justify-between">
                        <button class="px-6 py-2 mt-4 mr-28 text-white bg-pink-600 rounded-lg hover:bg-pink-900">Bejelentkezés</button>
                        <a href="#" class="text-sm text-pink-600 hover:underline">Elfelejtett jelszó?</a>
                    </div>
                    <div class="justify-center">
                        <button class="px-6 py-2 mt-4 w-full text-white bg-rose-700 rounded-lg hover:bg-rose-900">Regisztráció</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>