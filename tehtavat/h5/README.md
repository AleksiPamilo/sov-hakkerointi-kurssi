---
title: Binääri tässä, missä koodit?
---

# h5 Binääri tässä, missä koodit?

**Päivämäärä:** 18.9.2026  
**Tekijä:** Aleksi Pamilo   
**Ympäristö:** Kali Linux 2026.2 (x86_64, VirtualBox), Ryzen 7 9800x3d, Nvidia RTX 5070 TI

---

### lab0
- Aloitin asentamalla tiedostot ja purkamalla ne `unzip '*.zip'` -komennolla.
- Siirryin lab0 kansioon `cd lab0` ja avasin gdb näkymän `gdb ./buggy_program`.
- Komennolla `list` nähdään koodi.  
    ![koodi](image.png)
- Lisään breakpointin riville 4 `b 4`, ja `r` -komennolla käynnistän sovelluksen.
- `watch i` ja `watch size` komennoilla saan selville jokaisella kierroksella, mitä nämä muuttujat pitää sisällään.
- `continue` komentoa käyttämällä näen jokaisen kierroksen
    ![sovelluksen ajaminen](image-1.png)
- Tästä nähdään, että viimeisellä kierroksella `New value = 6`. Eli `<=` aiheuttaa sen, että ohjelma pyörii yhden kerran liikaa.
- Nyt voin korjata koodin vaihtamalla pienempi tai yhtä suuri kuin merkin pienempi kuin merkiksi.
- `nano ./buggy_program.c`
    ```c
    // Rikkinäinen funktio
    void buggy_function(int *arr, int size) {
        for (int i = 0; i <= size; i++) { // Huomaa: <= aiheuttaa puskuriylivuodon
            printf("Element %d: %d\n", i, arr[i]);
        }
    }

    // Korjattu funktio, kun <= -merkki vaihdetaan < -merkiksi
    void buggy_function(int *arr, int size) {
        for (int i = 0; i < size; i++) {
            printf("Element %d: %d\n", i, arr[i]);
        }
    }
    ```
- `make` -komennolla saan käännettyä sovelluksen uudelleen.
-  Nyt ohjelma pysähtyy viidenteen numeroon.
    ![korjattu ohjelma](image-2.png)

- Ennen ja jälkeen:  
    ![ennen](image-4.png)  
    ![jälkeen](image-3.png)

---

### lab1
- Siirrytään edellisestä tehtävästä lab1 tehtävään komennolla `cd ../lab1`.
- Avaan gdb näkymän komennolla `gdb ./gdb_example1`.
- Ajan ohjelman komennolla `r`. Gdb kertoo suoraan, että ohjelma kaatuu `Segmentation fault` virheeseen, ja että tämä tapahtuu rivillä 7.  
    ![segmentaatio virhe](image-5.png)
- Ohjelman voi korjata ohittamalla `NULL` viestit.
    ```c
    #include "stdio.h"

    void print_scrambled(char *message)
    {
        // Lisätään koodiin if-lause, joka tarkistaa, että onko message NULL, jos on, tämä viesti ohitetaan.
        if (message == NULL) {
            return;
        }

        register int i = 3; 
        do {
            printf("%c", (*message)+i);
        } while (*++message);
        printf("\n");
    }

    int main()
    {
        char * bad_message = NULL;
        char * good_message = "Hello, world.";

        print_scrambled(good_message);
        print_scrambled(bad_message);
    }
    ```
- Nyt ohjelma voidaan suorittaa onnistuneesti.  
![korjaus](image-6.png)
---

### Lähteet
1. Kurssitehtävä: [Tero Karvinen: Application Hacking - h5 Binääri tässä, missä koodit?](https://terokarvinen.com/application-hacking/#homework-tasks). Luettu: 18.9.2026.
