# Sécurité des Routes Admin - Stop Arnaque

## 📋 Fonctionnalités Implémentées

### 1. **Authentification Admin Sécurisée**
- Système d'authentification séparé pour les administrateurs
- Vérification du statut `admin: true` dans la base de données
- Stockage sécurisé des sessions admin dans le localStorage

### 2. **Protection des Routes**
- Toutes les routes `/admin/*` sont protégées
- Redirection automatique vers `/admin/login` si non authentifié
- Les utilisateurs normaux (`admin: false`) ne peuvent pas accéder à l'interface admin

### 3. **Gestion des Privilèges**
- **Utilisateurs normaux** : `admin: false` dans la base de données
- **Administrateurs** : `admin: true` dans la base de données
- Seuls les comptes avec `admin: true` peuvent accéder au panneau d'administration

## 🔒 Comment ça Fonctionne

### Architecture
```
┌─────────────────────────────────────────────────┐
│           AdminAuthContext.jsx                  │
│  Gère l'état d'authentification des admins     │
│  - adminUser (données de l'admin connecté)     │
│  - loginAdmin() (connexion)                     │
│  - logoutAdmin() (déconnexion)                  │
└─────────────────────────────────────────────────┘
                      ▼
┌─────────────────────────────────────────────────┐
│       ProtectedAdminRoute.jsx                   │
│  Vérifie si l'utilisateur est admin            │
│  - Affiche un loader pendant la vérification   │
│  - Redirige vers /admin/login si non admin     │
│  - Permet l'accès si admin authentifié         │
└─────────────────────────────────────────────────┘
                      ▼
┌─────────────────────────────────────────────────┐
│            AdminLayout.jsx                      │
│  Interface admin accessible uniquement         │
│  aux administrateurs authentifiés              │
└─────────────────────────────────────────────────┘
```

### Flux d'Authentification

1. **Tentative d'accès à `/admin`**
   ```
   User → /admin → ProtectedAdminRoute vérifie adminUser
   ```

2. **Si non authentifié**
   ```
   ProtectedAdminRoute → Redirect vers /admin/login
   ```

3. **Login Admin**
   ```
   AdminLogin → Backend API → Vérification credentials
   └─ Si admin: true → loginAdmin() → Redirect /admin/dashboard
   └─ Si admin: false → Message d'erreur "Accès refusé"
   ```

4. **Accès accordé**
   ```
   AdminUser stocké dans localStorage & context
   → Toutes les routes /admin/* accessibles
   ```

## 🛠️ Fichiers Modifiés/Créés

### Nouveaux Fichiers
- `src/context/AdminAuthContext.jsx` - Contexte d'authentification admin
- `src/components/ProtectedAdminRoute.jsx` - Composant de protection des routes

### Fichiers Modifiés
- `src/views/Admin/AdminLogin.jsx` - Intégration de l'authentification réelle
- `src/views/Admin/AdminLayout.jsx` - Utilisation du contexte admin
- `src/views/App.jsx` - Protection des routes admin
- `src/main.jsx` - Ajout du provider AdminAuthProvider

## 💾 Structure de la Base de Données

### Table `users`
```sql
{
  id: number,
  email: string,
  pseudo: string,
  password: string (hashé),
  admin: boolean,  ← Colonne qui détermine les privilèges
  createdAt: datetime,
  ...
}
```

### Exemples
```javascript
// Utilisateur normal
{
  id: 1,
  email: "user@example.com",
  pseudo: "JohnDoe",
  admin: false  // Ne peut PAS accéder à /admin
}

// Administrateur
{
  id: 2,
  email: "admin@stoparnaque.com",
  pseudo: "AdminUser",
  admin: true   // PEUT accéder à /admin
}
```

## 🚀 Utilisation

### Pour créer un compte Admin

1. **Via la base de données directement**
   ```sql
   UPDATE users SET admin = true WHERE email = 'votre-email@example.com';
   ```

2. **Via l'API (recommandé pour la production)**
   - Créer un endpoint sécurisé pour promouvoir un utilisateur en admin
   - Nécessite une authentification super-admin

### Pour se connecter en tant qu'Admin

1. Accéder à `/admin` ou `/admin/login`
2. Entrer les credentials d'un compte avec `admin: true`
3. Le système vérifie automatiquement le statut admin
4. Redirection vers `/admin/dashboard` si succès

### Pour se déconnecter

1. Cliquer sur l'avatar dans la barre supérieure
2. Sélectionner "Déconnexion"
3. Redirection automatique vers `/admin/login`
4. Session admin effacée du localStorage

## 🔐 Sécurité

### Mesures Implémentées
✅ Vérification backend du statut admin  
✅ Protection côté client avec `ProtectedAdminRoute`  
✅ Session admin séparée de la session utilisateur normale  
✅ Déconnexion automatique en cas de token invalide  
✅ Affichage d'un loader pendant les vérifications  

### Recommandations pour la Production
⚠️ Ajouter un système de tokens JWT  
⚠️ Implémenter un refresh token  
⚠️ Ajouter une limite de tentatives de connexion  
⚠️ Logger toutes les tentatives d'accès admin  
⚠️ Ajouter une authentification à deux facteurs (2FA)  

## 🧪 Testing

### Test 1: Accès sans authentification
```
1. Supprimer le localStorage: localStorage.removeItem('adminUser')
2. Naviguer vers /admin
3. Résultat attendu: Redirection vers /admin/login
```

### Test 2: Accès avec compte utilisateur normal
```
1. Se connecter avec un compte où admin = false
2. Essayer d'accéder à /admin/login avec ces credentials
3. Résultat attendu: Message "Accès refusé. Vous n'avez pas les privilèges administrateur."
```

### Test 3: Accès avec compte admin
```
1. Se connecter avec un compte où admin = true
2. Accéder à /admin/login avec ces credentials
3. Résultat attendu: Redirection vers /admin/dashboard
```

### Test 4: Persistance de session
```
1. Se connecter en tant qu'admin
2. Rafraîchir la page
3. Résultat attendu: Session maintenue, pas de redirection
```

## 📝 Notes Importantes

- Le système d'authentification admin est **indépendant** du système d'authentification utilisateur normal
- Un utilisateur peut être connecté en tant qu'utilisateur normal ET admin simultanément
- La déconnexion admin n'affecte pas la session utilisateur normale
- Pour modifier le statut admin d'un utilisateur, il faut modifier la colonne `admin` dans la base de données

## 🎯 Prochaines Étapes

- [ ] Implémenter un système de rôles plus granulaire (super-admin, moderator, etc.)
- [ ] Ajouter des logs d'audit pour toutes les actions admin
- [ ] Créer une interface pour gérer les permissions admin
- [ ] Implémenter la 2FA pour les comptes admin
- [ ] Ajouter une page de gestion des sessions actives
