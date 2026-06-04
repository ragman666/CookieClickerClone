param(
  [int]$Port = 8000
)

 


$mime = @{
  ".html" = "text/html"
  ".htm"  = "text/html"
  ".css"  = "text/css"
  ".js"   = "application/javascript"
  ".json" = "application/json"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".gif"  = "image/gif"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try {
  $listener.Start()
  Write-Host "Serving $($root) at $prefix`nPress Ctrl+C to stop."
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    Start-Job -ArgumentList $context -ScriptBlock {
      param($ctx)
      try {
        $req = $ctx.Request
        $path = $req.Url.AbsolutePath.TrimStart('/')
        if ([string]::IsNullOrEmpty($path)) { $path = 'index.html' }
        $filePath = Join-Path (Get-Location) $path
        if (Test-Path $filePath -PathType Leaf) {
          $ext = [IO.Path]::GetExtension($filePath).ToLower()
          $bytes = [System.IO.File]::ReadAllBytes($filePath)
          $ctx.Response.ContentType = $mime[$ext] -or 'application/octet-stream'
          $ctx.Response.ContentLength64 = $bytes.Length
          $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
          $ctx.Response.StatusCode = 404
          $msg = "404 Not Found: $path"
          $buf = [System.Text.Encoding]::UTF8.GetBytes($msg)
          $ctx.Response.ContentType = 'text/plain'
          $ctx.Response.ContentLength64 = $buf.Length
          $ctx.Response.OutputStream.Write($buf, 0, $buf.Length)
        }
      } catch {
        # ignore per-request errors
      } finally {
        $ctx.Response.OutputStream.Close()
      }
    } | Out-Null
  }
} catch {
  Write-Error "Failed to start listener: $_"
} finally {
  if ($listener.IsListening) { $listener.Stop(); $listener.Close() }
}
