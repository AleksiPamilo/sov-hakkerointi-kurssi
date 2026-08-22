# h0 Compile and Analyze

**Päivämäärä:** 20.8.2026   
**Tekijä:** Aleksi Pamilo   
**Ympäristö:** Ubuntu 26.04 (Linux), x86_64, g++ 15.2.0   

---

### 1. Lähdekoodi
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello World" << endl;
    return 0;
}
```

### 2. Kääntäminen
```bash
g++ task.cpp -o task
```

### 3. Binäärin analysointi
```bash
file task
```
Tuloste:
```
task: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=6f7a837f558fa4f7bdb60040d86cf6a4f4bff102, for GNU/Linux 3.2.0, not stripped
```

Analyysi: Tuloste kertoo, että kyseessä on 64-bittinen ELF-binääri, joka käyttää dynaamista linkitystä.

```bash
strings task | grep -i "Hello"
```

Tuloste
```
Hello World
```
Analyysi: Lähdekoodissa ollut teksti löytyy suoraan salaamattomana käännetystä tiedostosta.  

### Lähteet ja työkalut
- Tekoälyn käyttö: Sivustorakenteen ja raporttipohjan luomiseen on hyödynnetty Google Geminiä (ei tekstin suoraa generointia raporttiin)