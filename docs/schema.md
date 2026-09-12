# Database schema

Entity diagram for the Supabase project (project ref `oqygkcauoxxkrergfotc`). Source of truth for the actual DDL is `db/schema.sql` in the repo root.

```mermaid
erDiagram
    profiles {
        uuid id PK
        text email
        text role
        timestamptz created_at
        timestamptz confirmed_at
    }

    orders {
        uuid id PK
        uuid user_id FK
        text customer_name
        text customer_email
        text customer_phone
        text notes
        integer total_cents
        text status
        text stripe_session_id
        timestamptz created_at
    }

    order_items {
        uuid id PK
        uuid order_id FK
        text product_slug
        text product_name
        text tier_id
        text tier_name
        integer unit_price_cents
        integer quantity
    }

    contact_messages {
        uuid id PK
        text name
        text email
        text subject
        text service
        text message
        text company
        text budget_range
        text timeline
        timestamptz created_at
    }

    payment_requests {
        uuid id PK
        text name
        text email
        integer amount_cents
        text note
        text status
        text stripe_session_id
        timestamptz created_at
    }

    test_users {
        uuid id PK
        text name
        text email
        timestamptz created_at
    }

    profiles ||--o{ orders : "places (optional, guest checkout allowed)"
    orders ||--o{ order_items : "contains"
```

Notes:

- `profiles.id` references `auth.users.id` (Supabase auth), kept in sync by the `handle_new_user` and `handle_user_confirmed` triggers.
- `orders.user_id` is nullable because checkout does not require an account.
- `contact_messages.company`, `budget_range`, and `timeline` were added when the site moved to the new custom software, AI and automation, and web and mobile apps positioning, so the contact form can capture project context beyond name and message.
- `test_users` is a scratch table left over in the live database, not used by the app.
- Row level security is enabled on every table. Guests can insert into `orders`, `order_items`, `contact_messages`, and `payment_requests`, but can only read their own rows (or nothing, if not signed in). Admin reads and updates go through the `is_admin()` helper, which checks `profiles.role = 'admin'`.
