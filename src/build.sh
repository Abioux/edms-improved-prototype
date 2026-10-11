cd /workspace/edms_prototype
{ cat <<'H'
<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Economic Dossier Report – EDMS (prototype)</title>
<meta name="robots" content="noindex">
<style>
H
cat fonts.css bootstrap.min.css style.css; echo '</style></head><body class="font-sans antialiased">
<div class="min-h-screen bg-gray-100"><div id="app"></div>
<footer class="proto-foot d-print-none">Prototype – not connected to EDMS · sample data only · saved in this browser only</footer></div>
<script>'; cat data.js hsdata.js admin_data.js app.js admin_core.js admin_ui1.js admin_ui2.js admin_ui3.js; echo '</script></body></html>'; } > index.html
