[<- Takaisin etusivulle](../README.md)

# h1 Freedom of Action, Control, and Risk Mitigation

**Päivämäärä:** 22.8.2026   
**Tekijä:** Aleksi Pamilo   

---

## 1. ISMS Laajuusmäärittely

### A1. Mukana laajuudessa
* **Päätelaitteet:**
    * Apple MacBook
* **Virtualisointi / Labraympäristö:**
    * UTM-emulaattori (macOS), jossa pyörii Kali Linux (amd64) kurssiharjoituksia varten.
* **Tunnistautuminen ja pääsynhallinta (MFA):**
    * Älypuhelin ja Mac-ekosysteemi (Microsoft Authenticator ja laitteistotason avaimet/koodit).
* **Verkkoinfrastruktuuri:**
    * TP-Link Archer AX12 -reititin ja sen NAT-, SPI- ja WLAN-ominaisuudet sekä sisäverkko (LAN/WLAN).
* **Tiedot ja data:**
    * Kurssitehtävät, labradokumentaatio, lähdekoodit, konfiguraatiotiedostot ja autentikointitiedot.

### A2. Rajattu ulkopuolelle
* **Äly-TV:**
    * Eristetty omaan salasanasuojattuun vierasverkkoonsa. Laitteella ei ole pääsyä opiskeluympäristöön, eikä se liity kurssiin (riskin minimointi verkkosegmentoinnilla).
* **Windows-pöytätietokone:**
    * Henkilökohtainen viihde- ja vapaa-ajan laite. Kurssityöskentely ja Linux amd64 -ympäristön emulointi suoritetaan täysin MacBookilla, joten laite on rajattu opiskeluympäristön ulkopuolelle.
* **Työnantajan kannettava tietokone (Windows):**
    * Työnantajan hallinnoima laite, joka on rajattu puhtaasti palkkatyöhön. Pidetään loogisesti erillään opiskelu- ja labraympäristöstä.
* **Kerrostalon kuituverkko ja operaattorin runkoverkko:**
    * TP-Link-reitittimen WAN-portin ulkopuolinen infrastruktuuri, johon ei ole hallintaoikeutta (hyväksytty riski ja palveluntarjoajan vastuu).

### A3. Keskeiset rajapinnat ja rajat
* **Pilvi- ja opetuspalvelut:**
    * GitHub
    * Oppilaitoksen Microsoft OneDrive
    * Oppilaitoksen oppimisympäristö
* **Verkko- ja etäyhteydet:**
    * TP-Link-reitittimen NAT ja SPI-ominaisuudet (erillisiä etäyhteyksiä, kuten VPN/SSH/RDP, ei ole käytössä).
* **Palveluntarjoajat:**
    * Internet-palveluntarjoaja
    * GitHub
    * Microsoft

---

## 2. Näyttö ja todisteet auditoijalle
*   **Verkon segmentointi ja reititin:** Kuvakaappaus reitittimen hallintasivulta (Guest Network -asetukset ja aktiiviset laitteet).
*   **Labraympäristö ja virtualisointi:** Kuvakaappaus UTM-sovelluksen päänäkymästä (virtuaalikoneen asetukset ja tila).
*   **Pääsynhallinta ja MFA:** Kuvakaappaus Microsoft Authenticator -sovelluksesta (tilitiedot peitettynä).
*   **Tiedonhallinta ja versionhallinta:** Linkki GitHub-repositorioon ja kuvakaappaus oppilaitoksen OneDrive-tallennustilasta.

---

## 3. Verkkokaavio
```
            +-----------------------------------------------------------+
            |       Internet & Pilvipalvelut (GitHub/OneDrive/LMS)      |
            +-----------------------------------------------------------+
                                        |
                                [ WAN-rajapinta ]
                                        |
                    +-----------------------------------------+
                    |                Reititin                 |
                    |              ( NAT / SPI )              |
                    +-----------------------------------------+
                    /                                         \
            [ Pääverkko ]                                  [ Eristetty Verkko ]
                |                                                    \
                +--------------------------------+                    \
                |                                |                     \    
            (IN-SCOPE)                      (OUT-OF-SCOPE)            (OUT-OF-SCOPE)
                 |                           /          \                   |
        +----------------+     +-------------------+ +------------+     +--------+
        | Mac-Kannettava |     | Windows-pöytäkone | | Työläppäri |     | Äly-TV |
        +----------------+     +-------------------+ +------------+     +--------+
                |
        +-------------+
        | UTM Kali VM |
        +-------------+
```

## 4. Sidosryhmäanalyysi (ISO 27001)
| Sidosryhmä (*Interested Party*) | Tarve tai vaatimus (*Need / Requirement*) | ISO 27001 -viite | Miten osoitetaan (*Evidence*) |
| :--- | :--- | :--- | :--- |
| **Oppilaitos / Kurssin opettaja** | Akateeminen rehellisyys; labraympäristöä käytetään ainoastaan kurssin ohjeistettuihin harjoituksiin, eikä sitä käytetä haitalliseen toimintaan. | **Operation (Toiminta)** | Reitittimen palomuuri- ja porttiohjausasetukset sekä ajantasaiset GitHub/LMS-palautukset. |
| **Työnantaja** | Työlaitteen ja työtietojen suojaaminen ja erilläänpito opiskeluympäristöstä ja labrakokeiluista. | **Context & Operation (Toimintaympäristö ja toiminta)** | Laitetason eriyttäminen (erillinen työkone) ja labranympäristön ajaminen erillisessä UTM-virtuaalikoneessa. |
| **Minä itse (Ympäristön omistaja / Ylläpitäjä)** | Kurssimateriaalien, muistiinpanojen ja labrakonfiguraatioiden säilyvyys sekä opiskelun jatkuvuus laiterikon sattuessa. | **Leadership & Operation (Johtajuus ja toiminta)** | GitHub-versionhallinnan käyttö sekä koulun OneDrive-pilvisynkronointi tärkeille dokumenteille. |
| **Pilvipalveluntarjoajat (GitHub, Microsoft)** | Palveluehtojen noudattaminen ja käyttäjätilien suojaaminen luvattomalta pääsyltä. | **Operation (Toiminta / Pääsynhallinta)** | Monivaiheisen tunnistautumisen (MFA / Authenticator) ja vahvojen salasanojen käyttö. |

### Lähteet
1. Kurssitehtävä: [Tero Karvinen: Application Hacking - h1 Freedom of Action, Control, and Risk. Mitigation](https://terokarvinen.com/application-hacking/#homework-tasks). Luettu: 22.8.2026
2. Standardi: SFS-EN ISO/IEC 27001:2023: Tietoturvallisuus, kyberturvallisuus ja tietosuoja. Tietoturvallisuuden hallintajärjestelmät. Vaatimukset. Suomen Standardisoimisliitto SFS.