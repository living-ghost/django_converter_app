from django.shortcuts import redirect
from urllib.parse import urlparse, parse_qs

class RemoveNextForAnonymousMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Check if user is not authenticated
        if not request.user.is_authenticated:
            # If ?next=... is in the URL
            if 'next' in request.GET:
                parsed_url = urlparse(request.get_full_path())
                query_params = parse_qs(parsed_url.query)

                # Only redirect if ?next exists
                if 'next' in query_params:
                    path = request.path  # e.g. "/"
                    return redirect(path)  # remove query params by redirecting to path only

        return self.get_response(request)
