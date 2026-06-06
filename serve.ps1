param(
  [int]$Port = 9090
)

$root = Get-Location
$prefix = "http://localhost:$Port/"

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
    $ctx = $listener.GetContext()
    $corsHeaders = @{
      'Access-Control-Allow-Origin' = '*'
      'Access-Control-Allow-Methods' = 'GET, POST, OPTIONS'
      'Access-Control-Allow-Headers' = 'Content-Type'
    }
    try {
      $req = $ctx.Request
      if ($req.HttpMethod -eq 'OPTIONS') {
        foreach ($key in $corsHeaders.Keys) { $ctx.Response.AddHeader($key, $corsHeaders[$key]) }
        $ctx.Response.StatusCode = 204
        continue
      }

      $path = $req.Url.AbsolutePath.TrimStart('/')
      if ([string]::IsNullOrEmpty($path)) { $path = 'index.html' }

      if ($path -eq 'api/users') {
        foreach ($key in $corsHeaders.Keys) { $ctx.Response.AddHeader($key, $corsHeaders[$key]) }
        $ctx.Response.ContentType = 'application/json'
        $usersFile = Join-Path (Get-Location) 'usernames.json'
        if (-not (Test-Path $usersFile)) {
          Set-Content -Path $usersFile -Value '[]' -Encoding UTF8
        }
        if ($req.HttpMethod -eq 'GET') {
          $users = Get-Content -Path $usersFile -Raw | ConvertFrom-Json
          $json = [System.Text.Json.JsonSerializer]::Serialize($users)
          $buf = [System.Text.Encoding]::UTF8.GetBytes($json)
          $ctx.Response.ContentLength64 = $buf.Length
          $ctx.Response.OutputStream.Write($buf, 0, $buf.Length)
        } elseif ($req.HttpMethod -eq 'POST') {
          $input = New-Object System.IO.StreamReader($req.InputStream)
          $body = $input.ReadToEnd()
          $input.Close()
          try {
            $data = ConvertFrom-Json $body
            $username = ($data.username -as [string]).Trim()
            if ([string]::IsNullOrEmpty($username)) {
              $ctx.Response.StatusCode = 400
              $buf = [System.Text.Encoding]::UTF8.GetBytes('{"error":"username required"}')
              $ctx.Response.ContentLength64 = $buf.Length
              $ctx.Response.OutputStream.Write($buf, 0, $buf.Length)
            } else {
              $users = Get-Content -Path $usersFile -Raw | ConvertFrom-Json
              if ($users -eq $null) { $users = @() }
              if ($users -notcontains $username) {
                $users += $username
                $users | ConvertTo-Json -Depth 10 | Set-Content -Path $usersFile -Encoding UTF8
              }
              $response = @{ saved = $true; username = $username; users = $users }
              $json = [System.Text.Json.JsonSerializer]::Serialize($response)
              $buf = [System.Text.Encoding]::UTF8.GetBytes($json)
              $ctx.Response.ContentLength64 = $buf.Length
              $ctx.Response.OutputStream.Write($buf, 0, $buf.Length)
            }
          } catch {
            $ctx.Response.StatusCode = 400
            $buf = [System.Text.Encoding]::UTF8.GetBytes('{"error":"invalid json"}')
            $ctx.Response.ContentLength64 = $buf.Length
            $ctx.Response.OutputStream.Write($buf, 0, $buf.Length)
          }
        } else {
          $ctx.Response.StatusCode = 405
          $buf = [System.Text.Encoding]::UTF8.GetBytes('{"error":"method not allowed"}')
          $ctx.Response.ContentLength64 = $buf.Length
          $ctx.Response.OutputStream.Write($buf, 0, $buf.Length)
        }
      } else {
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
      }
    } catch {
      # ignore per-request errors
    } finally {
      $ctx.Response.OutputStream.Close()
    }
  }
} catch {
  Write-Error "Failed to start listener: $_"
} finally {
  if ($listener.IsListening) { $listener.Stop(); $listener.Close() }
}
