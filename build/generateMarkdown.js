const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://eyxgixdfztofiocggoty.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5eGdpeGRmenRvZmlvY2dnb3R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY2NjY3MTIsImV4cCI6MjAwMjI0MjcxMn0.1edXrQQ96Gbi1HU1NwbbBp5DRhdE8ToXtOxssheBMyA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function generateMarkdownFiles() {
  let { data: businesses, error } = await supabase
    .from('businesses')
    .select('*');

  if (error) throw error;

  for (let business of businesses) {
    let { data: promos, error } = await supabase
      .from('promos')
      .select('*')
      .eq('biz_slug', business.slug);

    if (error) throw error;

    let content =
`---
title: "${business.name}"
promos:
${promos.map(promo => `  - name: "${promo.name}"
    description: "${promo.description}"
    donation_price: ${promo.donation_price}
    purchase_price: ${promo.purchase_price}
    inventory: ${promo.inventory}`).join('\n')}
---
`;

    fs.writeFileSync(`../content/${business.slug}.md`, content);
  }
}

generateMarkdownFiles();
