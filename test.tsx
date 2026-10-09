useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(API + '/me', {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user.name);
          setPage('home');
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);