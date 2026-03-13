# Jules Studio — Stitch Export Download Script
# Project ID: 15274633151516375208

$screens = @(
    @{
        Name = "01-homepage"
        Title = "Jules Studio Minimalist Homepage (edited VN)"
        ScreenId = "432e3621c19943dea92bcee45d642ea7"
        HtmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzk4NmI1YWY0MGU3MDQ0NDY5ZGJiNDFjYTg3MTZlMDJjEgsSBxCNiMeR4xEYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTI3NDYzMzE1MTUxNjM3NTIwOA&filename=&opi=96797242"
        ScreenshotUrl = "https://lh3.googleusercontent.com/aida/AOfcidUXqmnx0ZXuITNDGDlYt36Nsuqp43mqfZuqc1Tkx2Q5R7qaVS0yfHMGZyO5CV8ZJWbsyIiSUr8pwEwGKHPOHgZso_yA2AEG0lw2Cl_qenEWx9sl9Jf2jwgKdPQfTldbJ3VzR2MfEhUXFN6c5rrGn4QWXOWuQMOlKFHx2t8T27hxFrIXbs2aIzmPzVmpn1j9U40s183qfTY6-qEiVcH-19YuOzdTgQEZsFPMENC98-ykgGvKteSt_vZPDRCY"
    },
    @{
        Name = "02-portfolio"
        Title = "Jules Studio Portfolio Page (edited VN)"
        ScreenId = "9b88517c2de546369e04b9628a07925a"
        HtmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzhkMGJjYWZjMDkxYzQ0MDg5YmI5NzNlNmE4NDg3ZWUzEgsSBxCNiMeR4xEYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTI3NDYzMzE1MTUxNjM3NTIwOA&filename=&opi=96797242"
        ScreenshotUrl = "https://lh3.googleusercontent.com/aida/AOfcidXuZK0CUtMyFAyoYyyE83ezFwDtd3OfnQCwxhMbS1z4KtUB89p2UBDnsEuw9Qu26ewndffNNvwmI5wRZ2e2Jk4JLzHHviFJ9UvXMT4K36mrDYquiYSOyFxBlo3HU9m_cvfnGE-jFt5sTmOcz4bPKv2ndOL4MlExa2fs-LuTjOrW_USYPQQddhIfqUMpgkRalkPhmYAgKmOFD25ezHRWlWa--cQYTvIyw9iarNA42PUW6HKjhkzyWsPAMXy1"
    },
    @{
        Name = "03-config-builder"
        Title = "Jules Studio Project Configurator (edited VN)"
        ScreenId = "2a668b33730440ed9376936d34cd9cc0"
        HtmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2NkMGYyZTEyYzY4YTRkNzZhYjk3YTk1ZjZkNzUzOGYwEgsSBxCNiMeR4xEYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTI3NDYzMzE1MTUxNjM3NTIwOA&filename=&opi=96797242"
        ScreenshotUrl = "https://lh3.googleusercontent.com/aida/AOfcidXC1lnpCQmg8fvgiB_B4gqLTC3Fu7St0wzDtSMSKss1KFOnWAeAdMtdritNlIsNaTjeYuiGINCgPVlZ_f6tV71DylDKDLg03GVv1V3XOvf0epjE8jPg7NEU9F59-CwakhyWUyKtTjpQBQ7mg-_vv23FRjny15AylSem0nR-aBNdYAjcmdaqPCRDiYXLpBVKyW3P3YaBVGde_qsk509YE5ix2WUqH6B0YeR1yMaMnC6YPngJQlqVHzJPtRE"
    },
    @{
        Name = "04-customer-login"
        Title = "Jules Studio Customer Login Page"
        ScreenId = "666b5e9b10d049a8bc9a9399b8aa8b3c"
        HtmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzYwYjZhYzU0MzNkODRmOWM5NjIzMGRmMTg3NmY3ZGU2EgsSBxCNiMeR4xEYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTI3NDYzMzE1MTUxNjM3NTIwOA&filename=&opi=96797242"
        ScreenshotUrl = "https://lh3.googleusercontent.com/aida/AOfcidXtZiuoHOa_4kqzHGSKx36obX0i7THUdFnxxYtS-83_onxhMT1UPP2JBzwUWyV0e4fAv-9WVrKTvkVcIDGcUsKm7JWqRYJkjJweKtnS7SqDO_SxsYvgzuopPQc-9QE0faOdt6wqetc-iOrvv_RhPruEZ9R_PR1B9d87_PvU-OPu6BEe7dEBFJNzzPQU0w3UyP1anVhqEBx-HpTFiglbdHiZQmh_V3oZ-iu1QB5h7GXN8tJDHEkh304UOsUA"
    },
    @{
        Name = "05-admin-dashboard"
        Title = "Jules Studio Admin Dashboard"
        ScreenId = "24c5f7f8967a440284a730b0c02788bd"
        HtmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzZkOGNhMjg1NzMwODRkYjVhOGNmODRjY2RhNmEzNmNlEgsSBxCNiMeR4xEYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTI3NDYzMzE1MTUxNjM3NTIwOA&filename=&opi=96797242"
        ScreenshotUrl = "https://lh3.googleusercontent.com/aida/AOfcidW13TiLLudyN76F4VJIGvqyVEt2QgMloD5XswWIdelKXsXpKiuDf5WagstC4VMqFcelq8Hlc6L0qMsJb-fUHrYJNyImSLYqMcr3pLACCWVFkBhdJa4d9PN8DrFKnG4leqy4DBIoQ-kQFK0mJ16jjXTQa7s-oIuGE5HeXb43-vS-uedwdjX0HoPShkAAOh_ARJySg8mHEcvzgYVmJzDMSYwVMM5IH5b50gJbKNKJrh_4asM0Q7xEix_CYi6c"
    },
    @{
        Name = "06-admin-leads"
        Title = "Jules Studio Leads Management"
        ScreenId = "a4479fb28bd44e02a465fd8f20f2a584"
        HtmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzA3ZWY4MTgyNzQxNjQxZWFiNjM0MDZhMzdmYTZjYmZlEgsSBxCNiMeR4xEYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTI3NDYzMzE1MTUxNjM3NTIwOA&filename=&opi=96797242"
        ScreenshotUrl = "https://lh3.googleusercontent.com/aida/AOfcidWSrTCXN0RoqZyEuwq99dOoYtBcg7hm0BwzwKqTDptwBgnFVYQpE-JsTkNWGj9Je8wEwHYPI3uPJ7FsrHPz_mTEFXEMce-PfvlN7qftDmXRml-S8axWvTgiN4vzH3gs6apc0BJo_MNnZTVczrXnhqQWxMrE2vL5w00ulwKTENJmTumYmipZHcJGyRzco-zR4vIKsw3LJbSqc-1vnS8C7JVSdsMULxN_Tji5jsM8NX1VOPB6kpMeByOvPr1C"
    },
    @{
        Name = "07-services"
        Title = "Jules Studio Services Overview"
        ScreenId = "f2691e22a5964585afed8619227e3dce"
        HtmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzQ5MDMyM2M3YzJkNjRhMDlhYWY1YzNlMGI3ZTVlMjM2EgsSBxCNiMeR4xEYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTI3NDYzMzE1MTUxNjM3NTIwOA&filename=&opi=89354086"
        ScreenshotUrl = "https://lh3.googleusercontent.com/aida/AOfcidWCihivQoI7spaFtIvI5nATbJKWhOKKjLUi78L5VoEsTBKNFImiXTQ_M2NuovZTvUICR8915dGMsyhViUY1J4u_tKsfHFbXP4Yx2x-vwdjV16PKtGCWmHQCVt5YmqrL-8OUMURAPNn6fI2mO23N1OH0IEbReZfIO-8CxoXO3tcvuuDIfV_1LD0oY4Ka7HNjfBmdgRE6yBCOnBN20-qtT06kuvwGrqfrT9jGnsvRsuvAsNmJAOblpA_kB3EY"
    },
    @{
        Name = "08-order-tracking-a"
        Title = "Jules Studio Order Tracking Variant A"
        ScreenId = "c4c0ee7729cc49349c9e9c8165c9052e"
        HtmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzkwNDljYjY4YTEwMjQ5Njc5MDk1ZDU4ZDU2ODVjMzlmEgsSBxCNiMeR4xEYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTI3NDYzMzE1MTUxNjM3NTIwOA&filename=&opi=89354086"
        ScreenshotUrl = "https://lh3.googleusercontent.com/aida/AOfcidXdqtc0Q1JYd19oAHbpjDwnRsUyop0ixxhxWcpegDEU-sYwtPj9OUvWvf6KF1aGBTYkcHgVG-CGm0qXkBrzy5m1Asc0_1JAae-xm6V4-FbaJArgVBQPU4mezGkwRqlsxsbUCx8RUvU9TwQ9uejF4BF7Bm3EUQvGUU_2_2qgWtl8IBE76KRUabP8yZIO3f7-Hqquj9ZEHiAq2HmMmpP_a4LcXtmkA6E1X9JCowS8u9vHIImv32siTnkNZa8"
    },
    @{
        Name = "09-order-tracking-b"
        Title = "Jules Studio Order Tracking Variant B"
        ScreenId = "7bada0b0cb6b426f95fc6c3700d2364a"
        HtmlUrl = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2Y1MjZmMjVkOTk2YjRkMmFiYjRhNjIwZDViYTQ1ZjFiEgsSBxCNiMeR4xEYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTI3NDYzMzE1MTUxNjM3NTIwOA&filename=&opi=89354086"
        ScreenshotUrl = "https://lh3.googleusercontent.com/aida/AOfcidUZeTeLdMQbXe1e0XUIfvzV7H00fj1n9uj6x7jieGI1anf5_XDr114gxnZe6CzAskBbvxZ4HNw2Y07PXYGeWPkNUNlBrVgNKejwTUb-d00dMWqogeOOTjWPJP3oQU_ymESsLctKGoRSaJbdWTrNYa45XArjpZxxsIIlh1qWhDuZejf9nVppa7z2B41IPBL8UGXnx8ialywpq4sE0eU-RPmpxGmGVp3WUUAgbU4J5gzKAvUsZ0JR41St7n0"
    }
)

$total = $screens.Count
$i = 0

foreach ($s in $screens) {
    $i++
    Write-Host "[$i/$total] Downloading: $($s.Title)..."

    # Download HTML
    $htmlPath = "html/$($s.Name).html"
    try {
        curl -L -s -o $htmlPath $s.HtmlUrl
        Write-Host "  HTML: OK"
    } catch {
        Write-Host "  HTML: FAILED - $_"
    }

    # Download Screenshot
    $imgPath = "screenshots/$($s.Name).png"
    try {
        curl -L -s -o $imgPath $s.ScreenshotUrl
        Write-Host "  Screenshot: OK"
    } catch {
        Write-Host "  Screenshot: FAILED - $_"
    }
}

Write-Host ""
Write-Host "=== Export complete ==="
Write-Host "HTML files:       stitch-export/html/"
Write-Host "Screenshots:      stitch-export/screenshots/"
