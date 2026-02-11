# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - heading "TaskFlow" [level=1] [ref=e4]
    - paragraph [ref=e5]: Gérez vos tâches simplement
  - main [ref=e6]:
    - generic [ref=e7]:
      - textbox "Ajouter une nouvelle tâche..." [ref=e8]
      - combobox [ref=e9] [cursor=pointer]:
        - option "Basse"
        - option "Moyenne" [selected]
        - option "Haute"
      - button "Ajouter" [ref=e10] [cursor=pointer]
    - generic [ref=e11]:
      - button "Toutes" [ref=e12] [cursor=pointer]
      - button "Actives" [ref=e13] [cursor=pointer]
      - button "Terminées" [ref=e14] [cursor=pointer]
    - list
    - generic [ref=e15]:
      - generic [ref=e16]: 0 tâche(s)
      - button "Supprimer terminées" [ref=e17] [cursor=pointer]
```