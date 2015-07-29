options( digits = 16 )
library( jsonlite )

d1 = 1
d2 = 1
x = 0:24
y = df( x, d1,d2 )

cat( y, sep = ",\n" )

data = list(
	d1 = d1,
	d2 = d2,
	data = x,
	expected = y
)


write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/matrix.json" )
