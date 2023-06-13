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

    let special_hours = [];
    if (business.special_hours) {
      for (let [day, hours] of Object.entries(business.special_hours)) {
        if (hours.is_open) {
          special_hours.push(`  - "${day}: Open from ${hours.open_blocks[0].start_time} to ${hours.open_blocks[0].end_time}"`);
        } else {
          special_hours.push(`  - "${day}: Closed"`);
        }
      }
    }

    let content =
`---
title: "${business.name}"
${business.tagline ? `tagline: "${business.tagline}"` : ''}
${special_hours.length > 0 ? `special_hours:\n${special_hours.join('\n')}\n` : ''}
promos:
${promos.map(promo => `  - name: "${promo.name}"
    description: "${promo.description}"
    donation_price: ${promo.donation_price}
    purchase_price: ${promo.purchase_price}
    inventory: ${promo.inventory}`).join('\n')}
---
`;

    fs.writeFileSync(`./content/${business.slug}.md`, content);
  }
}

generateMarkdownFiles();
