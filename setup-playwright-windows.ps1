<#
setup-playwright-windows.ps1

Usage:
  1) Open PowerShell as Administrator (recommended for installing Node if using winget/choco).
  2) From repository root run:
       .\setup-playwright-windows.ps1
     or to run a single test after setup:
       .\setup-playwright-windows.ps1 tests\gitLoginlogout.spec.js

What it does:
  - Checks for node and npm on PATH.
  - If missing, attempts installation using winget or choco if available, otherwise opens Node.js download page.
  - Installs npm dependencies (uses npm ci if package-lock.json is present, otherwise npm install).
  - Installs Playwright browsers (npx playwright install --with-deps).
  - Optionally runs a provided test path (first argument) or runs the full test suite.

Notes:
  - This script will not silently run unknown installers if package managers are not present; it will open the Node.js download page so you can install manually.
  - After installing Node via installer, open a new PowerShell window and re-run this script.
#>

param(
    [string]$TestToRun
)

function Has-Command($name){
    return (Get-Command $name -ErrorAction SilentlyContinue) -ne $null
}

Write-Host "Checking for Node.js and npm..."
if (-not (Has-Command node)) {
    Write-Warning "Node.js not found on PATH. Attempting to install..."

    if (Has-Command winget) {
        Write-Host "Installing Node.js (LTS) via winget..."
        winget install --id OpenJS.NodeJS.LTS -e --accept-package-agreements --accept-source-agreements
    }
    elseif (Has-Command choco) {
        Write-Host "Installing Node.js (LTS) via Chocolatey..."
        choco install nodejs-lts -y
    }
    else {
        Write-Warning "No package manager detected (winget/choco). Opening Node.js download page in your browser."
        Start-Process "https://nodejs.org/en/download/"
        Write-Host "Please download and install the Windows LTS MSI, then re-open PowerShell and re-run this script. Exiting now."
        exit 1
    }

    Write-Host "Installation attempted. Please open a new PowerShell window if Node was just installed, then re-run this script.";
    exit 0
}

Write-Host "Node found:" (node --version)
Write-Host "npm found:" (npm --version)

cd (Split-Path -Path $MyInvocation.MyCommand.Definition -Parent)
Write-Host "Repository root: $(Get-Location)"

# Install dependencies
if (Test-Path package-lock.json) {
    Write-Host "Running npm ci (package-lock.json found)..."
    npm ci
} else {
    Write-Host "Running npm install..."
    npm install
}

# Install Playwright browsers
Write-Host "Installing Playwright browsers (this may take a few minutes)..."
npx playwright install --with-deps

if ($TestToRun) {
    Write-Host "Running Playwright test: $TestToRun"
    npx playwright test $TestToRun
} else {
    Write-Host "No specific test requested; running full test suite (headless)..."
    npx playwright test --reporter=list
}

Write-Host "Done. If tests fail due to missing env vars, create a .env file from .env.example or set environment variables in your shell." 
